import { mailtrapClient, sender } from "../lib/mailtrap.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recepient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recepient,
      subject: "Welcome to LinkedIn",
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "Welcome",
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    throw error;
  }
};
export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commentorName,
  postUrl,
  commentContent
) => {
  const recipient = [{ email: recipientEmail }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New comment on your Post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commentorName,
        postUrl,
        commentContent
      ),
      category: "comment_notification",
    });
    console.log("Comment notification email sent successfully", response);
  } catch (error) {
    throw error;
  }
};

export const sendConnectionAcceptedEmail = async (
  senderEmail,
  senderName,
  recipientName,
  profileUrl
) => {
  const recipient = [{ email: senderEmail }];
  try {
    const response = mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `${recipientName} accepted your connection request!`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
      category: "connection_accepted",
    });
  } catch (error) {}
};
