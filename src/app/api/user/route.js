import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req, res) {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ response: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch users",
      statusCode: 500,
    });
  }

}

export async function POST(req, res) {
  const prisma = new PrismaClient();

  try {
    await prisma.user.create({
      data: {
        firstName: "Demo User",
        middleName: "Demo Meta Title",
        lastName: "Demo Meta Title",
        mobile: "01628499",
        email: "user2@yopmail.com",
        passwordHash: "user",
        registeredAt: new Date(),
        lastLoginAt: new Date(),
        intro: "user",
        profile: "user",
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully User Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to create a new user", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, res) {
  const prisma = new PrismaClient();

  try {
    await prisma.user.update({
      where:{email:"user@yopmail.com"},
      data: {
        firstName: "First Name",
        middleName: "Middle Name",
        lastName: "Last Name",
        mobile: "01628499",
        email: "user@yopmail.com",
        passwordHash: "user",
        registeredAt: new Date(),
        lastLoginAt: new Date(),
        intro: "demo user",
        profile: "user",
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully User Updated",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to update a new user", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, res) {
  const prisma = new PrismaClient();

  try {
    await prisma.user.delete({
      where:{email:"user@yopmail.com"}
    });
    return NextResponse.json({status: "Success", message: "Successfully User Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new user", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
