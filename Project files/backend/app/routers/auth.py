from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.auth.security import create_access_token, get_password_hash, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models import UserCreate, Token, User
from app.database import get_database
from app.models import UserInDB

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

@router.post("/register", response_model=User)
async def register(user: UserCreate):
    try:
        print(f"Registering user: {user.username}")
        db = get_database()
        print(f"Database object obtained: {db}")
        
        existing_user = await db["users"].find_one({"username": user.username})
        print(f"Existing user check complete: {existing_user}")
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
        
        print("Hashing password...")
        hashed_password = get_password_hash(user.password)
        print("Password hashed")
        
        user_in_db = UserInDB(**user.dict(exclude={"password"}), hashed_password=hashed_password)
        
        print("Inserting into DB...")
        await db["users"].insert_one(user_in_db.dict())
        print("Insertion complete")
        
        return user
    except Exception as e:
        print(f"Registration Error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_database()
    user_dict = await db["users"].find_one({"username": form_data.username})
    if not user_dict:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user_dict["hashed_password"]):
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_dict["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
