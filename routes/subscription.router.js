import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
    cancelSubscriptions,
    createSubscription,
    deleteSubscription,
    getAllSubscription,
    getSubscriptionDetail,
    getUpcomingSubscriptions,
    getUserSubscriptions,
    updateSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscription);

subscriptionRouter.get("/:id", getSubscriptionDetail);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscriptions);

subscriptionRouter.get(
    "/upcoming-renewals",
    authorize,
    getUpcomingSubscriptions
);

export default subscriptionRouter;
