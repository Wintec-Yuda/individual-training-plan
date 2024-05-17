import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getData, addData } from "@/lib/firebase/services";

export async function GET() {
  try {
    const data = await getData("audits");

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log(request);
  
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded) {
      const data = await request.json();

      const status = await addData("audits", data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Add audit successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Add audit failed",
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
