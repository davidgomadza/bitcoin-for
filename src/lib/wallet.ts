// This is mock data for demonstration purposes.
// In a real application, this would be handled securely.

export const correctSeedPhrase = [
    'galaxy', 'pulse', 'void', 'quantum', 'orbit', 'eternal', 'genesis', 'cipher', 'vault', 'nexus', 'cosmic', 'future'
];

const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const generateMockWallet = () => {
    const address = `J6${generateRandomString(50)}`;
    const balance = '8.00000000';
    return { address, balance };
};
