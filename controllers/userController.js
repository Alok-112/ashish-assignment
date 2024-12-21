import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { getDistanceFromLatLonInKm } from '../utils/distanceUtils.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, password, address, latitude, longitude } = req.body;
        const user = new User({ name, email, password, address, latitude, longitude });
        await user.save();
        const token = jwt.sign({ id: user._id, latitude, longitude }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            status_code: '200',
            message: 'User created successfully',
            data: { name, email, address, latitude, longitude, status: user.status, register_at: user.register_at, token },
        });
    } catch (error) {
        res.status(500).json({ status_code: '500', message: 'Error creating user', error });
    }
};

export const changeUserStatus = async (req, res) => {
    try {
        await User.updateMany({}, [
            {
                $set: {
                    status: {
                        $cond: { if: { $eq: ['$status', 'active'] }, then: 'inactive', else: 'active' },
                    },
                },
            },
        ]);
        res.status(200).json({ status_code: '200', message: 'All user statuses updated' });
    } catch (error) {
        res.status(500).json({ status_code: '500', message: 'Error updating statuses', error });
    }
};

export const getDistance = async (req, res) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({
                status_code: '400',
                message: 'Authorization token is required'
            });
        }

        // Decode the token to extract the user's latitude and longitude
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const userLatitude = decoded.latitude;
        const userLongitude = decoded.longitude;

        // Get destination coordinates from query parameters
        const { destination_latitude, destination_longitude } = req.query;
        if (!destination_latitude || !destination_longitude) {
            return res.status(400).json({
                status_code: '400',
                message: 'Destination latitude and longitude are required'
            });
        }

        // Calculate the distance between the user's location and the destination
        const distance = getDistanceFromLatLonInKm(userLatitude, userLongitude, destination_latitude, destination_longitude);

        // Return the response with the calculated distance
        res.status(200).json({
            status_code: '200',
            message: 'Distance calculated successfully',
            distance: `${distance} km`
        });
    } catch (error) {
        res.status(500).json({
            status_code: '500',
            message: 'Error calculating distance',
            error: error.message
        });
    }
};

export const getUserListing = async (req, res) => {
    try {
        const { week_number } = req.body;
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const queryDays = week_number.map((day) => dayNames[day]);

        const users = await User.aggregate([
            { $project: { name: 1, email: 1, day: { $dayOfWeek: '$register_at' } } },
            { $match: { day: { $in: queryDays.map((day) => dayNames.indexOf(day) + 1) } } },
        ]);

        const data = queryDays.reduce((acc, day) => {
            acc[day] = users.filter((user) => user.day === dayNames.indexOf(day) + 1);
            return acc;
        }, {});

        res.status(200).json({ status_code: '200', message: 'User listing fetched', data });
    } catch (error) {
        res.status(500).json({ status_code: '500', message: 'Error fetching user listing', error });
    }
};
