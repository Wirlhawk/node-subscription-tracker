// import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        // const { workflowRunId } = await workflowClient.trigger({
        //     url: `${SERVER_URL}/subscription/reminder`,
        //     body: {
        //         subscriptionId: subscription.id,
        //     },
        //     header: {
        //         "content-type": "application/json",
        //     },
        //     retries: 0,
        // });

        res.status(201).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You are not the owner of this account");
            error.statusCode = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.user.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
};

export const getAllSubscription = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptionDetail = async (req, res, next) => {
    try {
        // console.log(req.user._id);
        const subscriptionId = req.params.id;

        const subscription = await Subscription.findOne({
            _id: subscriptionId,
        });

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(201).json({
            sucess: true,
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        const userId = req.user.id;

        const subscription = await Subscription.findById(subscriptionId).select(
            "user"
        );

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user != userId) {
            const error = new Error("You are not the owner of this account");
            error.statusCode = 401;
            throw error;
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            {
                ...req.body,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            data: updatedSubscription,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        const userId = req.user.id;

        const subscription = await Subscription.findById(subscriptionId).select(
            "user"
        );

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user != userId) {
            const error = new Error("You are not the owner of this account");
            error.statusCode = 401;
            throw error;
        }

        const deletedSubscription = await Subscription.deleteOne({
            _id: subscriptionId,
        });

        res.status(200).json({ sucess: true, data: deletedSubscription });
    } catch (error) {
        next(error);
    }
};

export const cancelSubscriptions = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        const userId = req.user.id;

        const subscription = await Subscription.findById(subscriptionId).select(
            "user"
        );

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user != userId) {
            const error = new Error("You are not the owner of this account");
            error.statusCode = 401;
            throw error;
        }

        const cancelledSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            {
                status: "cancelled",
            },
            {
                new: true,
            }
        );

        res.status(200).json({ sucess: true, data: cancelledSubscription });
    } catch (error) {
        next(error);
    }
};

export const getUpcomingSubscriptions = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const today = new Date();

        const upcomingSubscriptions = await Subscription.find({
            user: userId,
            renewalDate: { $gt: today },
        }).sort({ renewalDate: 1 });

        res.status(200).json({
            success: true,
            data: upcomingSubscriptions,
        });
    } catch (error) {
        next(error);
    }
};
