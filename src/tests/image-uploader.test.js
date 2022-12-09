import {
    createTuitByUser,
    deleteTuit
} from "../services/tuits-service";
import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

const fs = require("fs");
// jest.mock('axios');

const IMAGE1_PATH = `${__dirname}/test-media/image1.jpg`;

describe('createTuitByUser', () => {
    // Sample user and tuit to create.
    const testUser = {
        username: 'testUser',
        password: 'testing123',
        email: 'test@robot.com'
    };
    const testTuitContent = 'Message sent!';

    beforeAll(() => {
        return deleteUsersByUsername(testUser.username);
    })

    afterAll(() => {
        return deleteUsersByUsername(testUser.username);
    })

    test('can create tuit with one image', async () => {
        // Assumes createUser has been tested.
        const createdUser = await createUser(testUser);
        const imageData = fs.readFileSync(IMAGE1_PATH);
        const blob = new Blob([imageData], {type: "image/jpeg"})
        const tuitFormData = new FormData();
        tuitFormData.append("image", blob);
        tuitFormData.append("tuit", testTuitContent);
        const createdTuit = await createTuitByUser(createdUser._id, tuitFormData);

        // verify created tuit matches the parameter tuit
        expect(createdTuit.tuit.image.length).toBe(1);
        expect(createdTuit.postedBy).toEqual(createdUser._id);

        // Cleans up after testing
        await deleteTuit(createdTuit._id);
    })
});

describe('deleteTuit', () => {
    // Sample user and tuit to create.
    const testUser = {
        username: 'testUser',
        password: 'testing123',
        email: 'test@robot.com'
    };
    const testTuitContent = 'Message sent!';

    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
    })

    afterAll(async () => {
        await deleteUsersByUsername(testUser.username);
    })

    test('can delete tuit with REST API', async () => {
        const createdUser = await createUser(testUser);
        const createdTuit = await createTuitByUser(createdUser._id, testTuitContent);

        const status = await deleteTuit(createdTuit._id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});


