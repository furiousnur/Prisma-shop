import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req, res) {
  const prisma = new PrismaClient();
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json({ response: tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch tags",
      statusCode: 500,
    });
  }

}

export async function POST(req, res) {
  const prisma = new PrismaClient();

  try {
    await prisma.tag.create({
      data: {
        title: "Demo Tag",
        metaTitle: "Demo Meta Title",
        slug: "htt://example.com",
        content: "tag",
      },
    });
    return NextResponse.json({status: "Success", message: "Successfully Tag Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to create a new tag", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, res) {
  const prisma = new PrismaClient();

  try {
    await prisma.tag.update({
      where:{id:1},
      data: {
        title: "Demo Tag1",
        metaTitle: "Demo Meta Title1",
        slug: "htt://example.com",
        content: "tag",
      },
    });
    return NextResponse.json({status: "Success", message: "Successfully Tag Updated",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to update a new tag", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, res) {
  const prisma = new PrismaClient();

  try {
    await prisma.tag.delete({
      where:{id:2}
    });
    return NextResponse.json({status: "Success", message: "Successfully Tag Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new tag", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
