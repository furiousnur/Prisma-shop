import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const categories = await prisma.categories.findMany(); 
    const categoryData = categories.map((category) => ({
      id: Number(category.id),
      parentId: Number(category.parentId),
      title: category.title,
      metaTitle: category.metaTitle,
      slug: category.slug,
      content: category.content
    }));

    return NextResponse.json({ data: categoryData });
  } catch (error) {
    console.error("Error fetching categories:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch categories",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.categories.create({
      data: {
        parentId: reqBody.parentId,
        title: reqBody.title,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        content: reqBody.content,
      }
    }); 
    return NextResponse.json({status: "Success", message: "Successfully Category Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to create a new Category", 
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
    await prisma.categories.update({
      where:{id:reqBody.id},
      data: {
        parentId: reqBody.parentId,
        title: reqBody.title,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        content: reqBody.content,
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Category Updated",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to update a new category", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, res) {
  const prisma = new PrismaClient();
  const reqBody = await req.json();
  try {
    await prisma.categories.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Category Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new category", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
