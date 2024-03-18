/* eslint-disable @typescript-eslint/naming-convention */
import { randomBytes, pbkdf2Sync } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { jwtSecret, tokenExpiration } from '../../config';
import User from '../entities/User';
import { RegUser, UserPayload } from '../../types';

export default function createUsersRepo(dataSource: DataSource) {
    return dataSource.getRepository(User).extend({
        /**
         * Create a new user in the users table, by hashing the password with bcrypt.
         *
         * @param userName The username of the user to create
         * @param password The plaintext password for the user (this will be hashed)
         * @param email The email address of the user to create
         * @param displayName The full name of the user to create
         * @return the newly created user
         */
        async createUserWithPassword({
            fullname,
            username,
            email,
            password,
        }: RegUser): Promise<User> {
            const salt = randomBytes(16).toString('hex');
            const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

            return this.save({
                fullname,
                username,
                email,
                hash,
                salt,
            });
        },
        /**
         * Generate a valid, signed JWT token containing the user id.
         *
         * @param user The user for whom to generate the token
         * @return a string with the JWT token
         */
        generateToken({ _id, fullname, username, email }: User): string {
            return sign(
                {
                    _id,
                    fullname,
                    username,
                    email,
                    exp: new Date().getTime() + tokenExpiration * 3600 * 1000,
                },
                jwtSecret
            );
        },
        /**
         * Check if the given password is correct for the user with bcrypt.
         *
         * @param user The user to check the password against
         * @param password The given password to validate
         * @return true if the password is valid, false if it is invalid
         */
        validatePassword({ salt, hash }: User, password: string): boolean {
            return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex') === hash;
        },
        /**
         * Identify a user from a JWT token, by checking if the token is valid, and finding the user from the id within.
         *
         * @param token the JWT format token, that has the correct signing
         * @return the user if user is found, null if the token is failed or the user does not exist
         */
        async fromToken(token: string): Promise<User | null> {
            try {
                const { username } = verify(token, jwtSecret) as UserPayload;
                return await this.findOneBy({ username });
            } catch (err) {
                return null;
            }
        },
    });
}
