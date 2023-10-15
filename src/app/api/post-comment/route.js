import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const post_Comment = await prisma.post_Comment.findMany(); 
    const postCommentData = post_Comment.map((post_Comment) => ({
      id: Number(post_Comment.id),
      postId: Number(post_Comment.postId),
      parentId: Number(post_Comment.parentId),
      title: post_Comment.title,
      published: post_Comment.published,
      createdAt: post_Comment.createdAt,
      content: post_Comment.content,
      updatedAt: post_Comment.updatedAt,
      publishedAt: post_Comment.publishedAt
    }));

    return NextResponse.json({ data: postCommentData });
  } catch (error) {
    console.error("Error fetching post comment:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch post comment",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.post_Comment.create({
      data: {
        postId: reqBody.postId,
        parentId: reqBody.parentId,
        title: reqBody.title,
        published: reqBody.published,
        createdAt: new Date(),
        content: reqBody.content,
        updatedAt: new Date(),
        publishedAt: new Date()
      }
    }); 
    return NextResponse.json({status: "Success", message: "Successfully Post Comment Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to create a new Post Comment", 
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
    await prisma.post_Comment.update({
      where:{id:reqBody.id},
      data: {
        postId: reqBody.postId,
        parentId: reqBody.parentId,
        title: reqBody.title,
        published: reqBody.published, 
        content: reqBody.content,
        updatedAt: new Date(),
        publishedAt: new Date()
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Comment Updated",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new Post Comment",
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
    await prisma.post_Comment.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Comment Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new post comment", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
