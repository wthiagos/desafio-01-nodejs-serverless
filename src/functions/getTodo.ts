import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { userid } = event.pathParameters;

    const response = await document
        .scan({
            TableName: "todos",
            FilterExpression: "user_id = :userid",
            ExpressionAttributeValues: {
                ":userid": userid
            }
        })
        .promise();

    return {
        statusCode: 201,
        body: JSON.stringify(response.Items)
    };
};