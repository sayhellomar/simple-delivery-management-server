import { SocketAddress } from "net";
import { pool } from "../../db";
import type { Profile } from "./profile.interface";

async function createProfileToDB(payload: Profile) {
    const { user_id, address, phone } = payload;
    const result = await pool.query(
        `
        INSERT INTO 
            user_profiles (user_id, address, phone)
        VALUES
            ($1, $2, $3)
        RETURNING *
    `,
        [user_id, address, phone],
    );

    return result;
}

async function getProfilesFromDB() {
    const result = pool.query(`
        SELECT * FROM user_profiles
    `);
    return result;
}

async function getProfileFromDB(id: number) {
    const result = pool.query(
        `
        SELECT user_id, address, phone FROM user_profiles
        WHERE id = $1
    `,
        [id],
    );
    return result;
}

async function updateProfileToDB(payload: Profile, id: number) {
    const { address, phone } = payload;
    const result = await pool.query(
        `
        UPDATE user_profiles
        SET
            address = COALESCE($1, address),
            phone = COALESCE($2, phone)
        WHERE id = $3
        RETURNING address, phone
    `,
        [address ?? null, phone ?? null, id],
    );
    return result;
}

async function deleteProfileFromDB(id: number) {
    const result = await pool.query(
        `
        DELETE FROM user_profiles
        WHERE id = $1
    `,
        [id],
    );
    return result;
}

export const profileService = {
    createProfileToDB,
    getProfilesFromDB,
    getProfileFromDB,
    updateProfileToDB,
    deleteProfileFromDB,
};
