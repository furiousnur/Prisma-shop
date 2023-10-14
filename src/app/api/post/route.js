import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const post = await prisma.post.findMany(); 
    const postData = post.map((post) => ({
      id: Number(post.id),
      parentId: Number(post.parentId),
      authorId: Number(post.authorId),
      title: post.title,
      metaTitle: post.metaTitle,
      slug: post.slug,
      content: post.content,
      summary: post.summary,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      publishedAt: post.publishedAt, 
    }));

    return NextResponse.json({ data: postData });
  } catch (error) { 
    await prisma.$disconnect();
    return NextResponse.json({
      status: "Error",
      message: "Failed to fetch post",
      error: error.message,
      statusCode: 500,
    });
  }
}

export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    const reqBody = await req.json();
    await prisma.post.create({
      data: {
        parentId: reqBody.parentId,
        authorId: reqBody.authorId,
        title: reqBody.title,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        content: reqBody.content,
        summary: reqBody.summary,
        published: reqBody.published,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
      }
    }); 
    return NextResponse.json({status: "Success", message: "Successfully Post Created",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ 
      status: "Error", 
      message: "Failed to create a new Post", 
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
    await prisma.post.update({
      where:{id:reqBody.id},
      data: {
        parentId: reqBody.parentId,
        authorId: reqBody.authorId,
        title: reqBody.title,
        metaTitle: reqBody.metaTitle,
        slug: reqBody.slug,
        content: reqBody.content,
        summary: reqBody.summary,
        published: reqBody.published,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
      }
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Updated",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to update a new post", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, res) {
  const prisma = new PrismaClient();
  const reqBody = await req.json();
  try {
    await prisma.post.delete({
      where:{id:reqBody.id}
    });
    return NextResponse.json({status: "Success", message: "Successfully Post Deleted",statusCode: 200});
  } catch (error) { 
    return NextResponse.json({ status: "Error", message: "Failed to delete a new post", statusCode: 500});
  } finally {
    await prisma.$disconnect();
  }
}
