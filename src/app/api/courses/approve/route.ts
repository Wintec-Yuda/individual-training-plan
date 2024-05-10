import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { manageCoursesEmployee } from "@/lib/firebase/services";

export async function PUT(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const data = await request.json();

    if (decoded) {
      const status = await manageCoursesEmployee(data);

      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: `Course to employee successfully`,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: `Course to employee failed`,
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
