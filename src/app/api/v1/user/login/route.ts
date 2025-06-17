import { NextResponse } from 'next/server';
import { UserLogin } from '@/types/user';
import { UserService } from '@/lib/services/user-service';
import { createAccessToken } from '@/lib/utils/auth';

export async function POST(request: Request) {
  try {
    const userData: UserLogin = await request.json();
    const user = await UserService.getUserByUsername(userData.username);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const accessToken = await createAccessToken({ sub: user.username });
    return NextResponse.json({
      access_token: accessToken,
      token_type: 'bearer'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 