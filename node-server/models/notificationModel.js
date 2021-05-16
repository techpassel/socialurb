import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: false
        },
        subjectType: {
            type: String,
            required: true
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false
        },
        subjectLink: {
            type: String,
            required: true
        },
        isRead: {
            type: Boolean,
            required: false,
            default: false
        } 
    }, 
    {
        timestamps: true
    }
);

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification;