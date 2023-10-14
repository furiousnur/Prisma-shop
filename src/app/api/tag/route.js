import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const tags = await prisma.tag.findMany(); 
    const tagData = tags.map((tag) => ({
      id: Number(tag.id),
      title: tag.title,
      metaTitle: tag.metaTitle,
      slug: tag.slug,
      content: tag.content,
    }));

    return NextResponse.json({ data: tagData });
  } catch (error) {
    console.error("Error fetching tags:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch tags",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.tag.create({
      data: {
        title: reqBody.title,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        content: reqBody.content,
      }
    }); 
    return NextResponse.json({status: "Success", message: "Successfully Tag Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to create a new tag", 
      statusCode: 500,
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, res) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    await prisma.tag.update({
      where:{id:11},
      data: {
        title: reqBody.title,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        content: reqBody.content,
      }
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
