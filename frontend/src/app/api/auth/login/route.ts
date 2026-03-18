import { NextRequest, NextResponse } from "next/server";
import * as authService from "@/lib/services/auth.service";
import { errorToResponse } from "@/lib/api/errorResponse";
import { UnauthorizedError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try{
    const body = await request.json();
    const {email, password} = body
    const {token, user} = await authService.login(email, password)

    if(!token || !user){
      throw new UnauthorizedError("Credenciais inválidas");
    }

    return NextResponse.json({token, user}, {status: 200})
    
  }catch(error){
    return errorToResponse(error);
  }
  
}