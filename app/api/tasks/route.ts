import {prisma} from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }


        const { title, description, date, inProgress, completed } = await req.json();

        if (!title || !description || !date ) {
            return NextResponse.json({
                error: "Missing Required Field",
                status: 400,
            });
        }

        if (title.length < 3  ) {
            return NextResponse.json({
                error: "Title must be at least 3 character long",
                status: 400
            });  
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isInProgress: inProgress,
                isCompleted: completed,
                userId,
            },
        });

        return NextResponse.json(task);

    } catch (error) {
        console.log("ERROR CREATING TASK: ", error);
        return NextResponse.json({ error: "Error Creating Task.", status: 500});
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" , status: 401});
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });

        console.log("Tasks: ", tasks);
        return NextResponse.json(tasks);
    } catch (error) {
        console.log("ERROR GETTING TASK: ", error);
        return NextResponse.json({ error: "Error Updating Task.", status: 500});
    }
}

export async function PUT(req: Request) {

    try {
        const { userId } = auth();
        const { isCompleted, id } = await req.json();
    
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                isCompleted,
            },
        });

        console.log("TASK UPDATED", task);
        return NextResponse.json(task);
    } catch (error) {
        console.log("ERROR UPDATTING TASK: ", error);
        return NextResponse.json({ error: "Error Deleting Task.", status: 500});
    }
}