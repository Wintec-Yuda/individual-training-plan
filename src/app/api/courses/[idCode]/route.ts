import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { editData, getDataByField } from "@/lib/firebase/services";

export async function GET(request: NextRequest) {
  try {
    const code: any = request.url.split("/").pop();
    const data = await getDataByField("courses", "code", code);
    return NextResponse.json(
      {
        success: true,
        data: data,
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

export async function PUT(request: NextRequest) {
  try {
    const id: any = request.url.split("/").pop();
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded) {
      const data = await request.json();
      delete data.id;
      const status = await editData("courses", id, data);

      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Course updated successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to update course",
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
