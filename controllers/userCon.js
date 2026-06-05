import fs from 'fs'
import path from 'path'
import { validateUser } from '../util/validator.js'

import User from '../models/usersModel.js'

export const test = (req, res) => {
    return res.status(200).json({
        message: 'User route is working'
    });
};

export const createUser = async (req, res) => {
    console.log('Received user data:', req.body);

    let params = req.body

    try {
        // Validate user data
        validateUser(params);
        console.log('Validation successful, creating user...');
        
        const u = new User(params)
        console.log('User instance created:', u);

        // Save user to database
        await u.save()
        console.log('User saved to database.');

        return res.status(200).json({
            status: 'success',
            user: u,
            message: 'User created successfully',
        });

    } catch(error) {
        // mongoose validation error
        if (error.name === 'ValidationError') {
            console.error('Error creating user:', error);
            return res.status(400).json({
                status: 'error',
                message: error.message,
            })       
        }

        // Own validation error
        if (error.message && error.message.includes('long')) {
            console.error('Own validation error');

            return res.status(400).json({
                status: 'error',
                message: 'User data incomplete or invalid: ',
                details: error.message,
            })
        }

        // Error saving to database or other unexpected errors
        console.error('Unexpected error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred while creating the user.',
            details: error.message,
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let users = User.find()

        if (req.params.last) {
            users.limit(req.params.last)
        }

        // Sort users by ID in descending order to get the most recent users first
        let result = await users.sort({ _id: -1 })

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No users found',
            })
        }

        return res.status(200).json({
            status: 'success',
            count: result.length,
            users: result,
        })

    } catch(error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred while fetching users.',
            details: error.message,
        })

    }
}

export const getUser = async (req, res) => {
    
    // Find user by email and password
    const { email, password } = req.body 

    try {
        const u = await User.findOne({ email, password })
        if (!u) {
            return res.status(400).json({
                status: 'error',
                message: 'User not found with provided email and/or password.',
            })
        }

        return res.status(200).json({
            status: 'success',
            user: {
                name: u.name,
                role: u.role,
                lastName: u.lastName,
                email: u.email,
                password: u.password,
                pfp: u.pfp,
            }
        })

    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred while fetching the user.',
            details: error.message,
        })
    }
}

export const deleteUser = async (req, res) => {
    let uId = req.params.id

    try {
        let result = await User.findOneAndDelete({ _id: uId })

        if (!result) {
            return res.status(500).json({
                status: 'error',
                message: 'An error has occured while trying to delete the user.',
            })
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'User deleted successfully.',
            })
        }
    } catch(error) {
        return res.status(400).json({
            status: 'error',
            message: "User can't be deleted.",
        })
    }
}

export const updateUser = async (req, res) => {

    let uId = req.params.id

    try {
        let result = await User.findOneAndUpdate({ _id: uId }, req.body, { new: true })

        if (!result) {
            return res.status(400).json({
                status: 'error',
                message: "Missing or invalid data, user can't be updated.",
            })
        } else {
            return res.status(200).json({
                status: 'success',
                user: result,
                message: 'User updated successfully.',
            })
        }
    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'An error has occured while trying to update the user.',
        })
    }
}