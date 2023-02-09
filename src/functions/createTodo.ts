import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ICreateTodo } from "src/dtos/create-todo.dto";
import { ITodo } from "src/dtos/todo.dto";
import { formatDate } from "src/utils/formatDate";
import { generateId } from "src/utils/generateId";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { userid } = event.pathParameters;
    const {
        title,
        deadline
    } = JSON.parse(event.body) as ICreateTodo;

    const todo: ITodo = {
        id: generateId(),
        deadline: formatDate(deadline),
        done: false,
        title,
        user_id: userid
    };

    await document
        .put({
            TableName: "todos",
            Item: todo
        })
        .promise();

    return {
        statusCode: 201,
        body: JSON.stringify(todo)
    };
};