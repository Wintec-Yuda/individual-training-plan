import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { addData, getData, manageCoursesEmployee } from "@/lib/firebase/services";

export async function GET() {
  try {
    const data = await getData("courses");
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

export async function POST(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded && decoded.jobTtlName === "People Development Supervisor") {
      const data = await request.json();

      const status = await addData("courses", data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Add course successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Add course failed",
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

export async function PUT(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const data = await request.json();

    if (decoded && (decoded.nik === data.superiorNIK || decoded.nik === data.nik)) {
      const status = await manageCoursesEmployee(data.nik, data.codes, data.action);

      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: `${data.action} course to employee successfully`,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: `${data.action} course to employee failed`,
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
