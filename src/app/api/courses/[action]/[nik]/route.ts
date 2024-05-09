import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { manageCoursesEmployee } from "@/lib/firebase/services";

export async function PUT(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const parts = request.url.split("/");
    const nik: any = parts.pop();
    const action: any = parts.pop();

    if (decoded) {
      const data = await request.json();

      const status = await manageCoursesEmployee(nik, data, action);

      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: `${action} course to employee successfully`,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: `${action} course to employee failed`,
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
