import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
import logging

logger = logging.getLogger(__name__)

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_PATH = os.path.join(BASE_DIR, "data", "climate_data.csv")

class AnalyticsService:
    def __init__(self):
        self.data = self._load_data()

    def _load_data(self):
        # Update path to global data
        data_path = os.path.join(BASE_DIR, "data", "global_climate_data.csv")
        if os.path.exists(data_path):
            return pd.read_csv(data_path)
        # Fallback to old if new not found
        old_path = os.path.join(BASE_DIR, "data", "climate_data.csv")
        if os.path.exists(old_path):
            return pd.read_csv(old_path)
        return None

    def _filter_data(self, city: str = None, country: str = None, start_date: str = None, end_date: str = None):
        if self.data is None:
            return None
        
        df = self.data.copy()
        
        # Ensure date column is datetime
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date'])

        # Apply Filters
        if country:
            df = df[df['country'] == country]
        if city:
            df = df[df['city'] == city]
        
        if start_date:
            df = df[df['date'] >= pd.to_datetime(start_date)]
        if end_date:
            df = df[df['date'] <= pd.to_datetime(end_date)]
            
        return df

    def _plot_to_base64(self):
        img = io.BytesIO()
        plt.savefig(img, format='png', bbox_inches='tight')
        img.seek(0)
        return base64.b64encode(img.getvalue()).decode()

    def generate_correlation_matrix(self, city: str = "Karachi", country: str = None):
        # Default to Karachi if nothing specified to ensure meaningful correlation
        df = self._filter_data(city=city, country=country)
        
        if df is None or df.empty:
            return None

        plt.figure(figsize=(10, 8))
        # Filter only numeric columns
        numeric_data = df.select_dtypes(include=['number'])
        if numeric_data.empty:
            return None
            
        corr = numeric_data.corr()
        
        sns.heatmap(corr, annot=True, cmap='coolwarm', linewidths=0.5)
        plt.title(f'Correlation Matrix - {city or country or "Global"}')
        
        img_base64 = self._plot_to_base64()
        plt.close()
        return img_base64

    def generate_variable_comparison(self, variables: list[str], city: str = "Karachi", country: str = None):
        df = self._filter_data(city=city, country=country)
        
        if df is None or df.empty:
            return None
        
        x_axis = df['date'] if 'date' in df.columns else df.index
        x_label = 'Date' if 'date' in df.columns else 'Index'

        fig, ax = plt.subplots(figsize=(10, 6))
        
        for var in variables:
            if var in df.columns:
                ax.plot(x_axis, df[var], label=var)
        
        ax.set_xlabel(x_label)
        ax.set_ylabel('Values')
        ax.legend()
        plt.title(f"Comparison: {', '.join(variables)} ({city or country})")

        img_base64 = self._plot_to_base64()
        plt.close()
        return img_base64

    def get_all_data(self, city: str = None, country: str = None, start_date: str = None, end_date: str = None):
        """Returns the dataset as a list of dictionaries for frontend charts."""
        # Validate that if no filters are provided, we default to something reasonable or return all?
        # User asked for default Karachi.
        target_city = city if city else ("Karachi" if not country else None)
        target_country = country if country else ("Pakistan" if not city else None)
        
        # If user explicitly sent empty string or None, we might fallback. 
        # But let's stick to the requested default: Karachi, PK if nothing provided.
        if not city and not country: 
            target_city = "Karachi"
            target_country = "Pakistan"

        df = self._filter_data(city=target_city, country=target_country, start_date=start_date, end_date=end_date)
        
        if df is None or df.empty:
            return []
        
        # Ensure date format is string (ISO) for JSON serialization
        if 'date' in df.columns:
            df['date'] = df['date'].dt.strftime('%Y-%m-%d')
        
        # Fill NaNs to avoid JSON errors
        df = df.fillna(0)
        
        return df.to_dict(orient='records')

analytics_service = AnalyticsService()
