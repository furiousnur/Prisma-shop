import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const post_meta = await prisma.post_Meta.findMany(); 
    const postmetaData = post_meta.map((post_meta) => ({
      id: Number(post_meta.id),
      postId: Number(post_meta.postId),
      key: post_meta.key, 
      content: post_meta.content
    }));

    return NextResponse.json({ data: postmetaData });
  } catch (error) {
    console.error("Error fetching post meta:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch post meta",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.post_Meta.create({
      data: {
        postId: reqBody.postId,
        Key: reqBody.key, 
        content: reqBody.content,
      }
    }); 
    return NextResponse.json({status: "Success", message: "Successfully Post Meta Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to create a new Post Meta", 
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
    await prisma.post_Meta.update({
      where:{id:reqBody.id},
      data: {
        postId: reqBody.postId,
        Key: reqBody.key,
        content: reqBody.content,
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Meta Updated",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new Post Meta",
      statusCode: 500,
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, res) {
  const prisma = new PrismaClient();
  const reqBody = await req.json();
  try {
    await prisma.post_Meta.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Meta Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new category", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
