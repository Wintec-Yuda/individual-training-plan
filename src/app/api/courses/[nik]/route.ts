import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { updateEmployeeInCourses } from "@/lib/firebase/services";

export async function PUT(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const nik: any = request.url.split("/").pop();

    if (decoded) {
      const data = await request.json();

      const status = await updateEmployeeInCourses(nik, data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Add course to employee successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Add course to employee failed",
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
