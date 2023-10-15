import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const postTags = await prisma.post_Tag.findMany(); 
    const postTagData = postTags.map((post_tag) => ({
      id: Number(post_tag.id),
      postId: Number(post_tag.postId),
      tagId: Number(post_tag.tagId)
    }));

    return NextResponse.json({ data: postTagData });
  } catch (error) {
    console.error("Error fetching post tag:", error);
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch post tag",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.post_Tag.create({
      data: {
        postId: reqBody.postId,
        tagId: reqBody.tagId, 
      }
    }); 
    return NextResponse.json({status: "Success", message: "Successfully Post Tag Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to create a new Post Tag", 
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
    await prisma.post_Tag.update({
      where:{id:reqBody.postId},
      data: {
        postId: reqBody.postId,
        tagId: reqBody.tagId,
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Tag Updated",statusCode: 200});
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: "Failed to update a new Post Tag",
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
    await prisma.post_Tag.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Tag Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new post tag", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
