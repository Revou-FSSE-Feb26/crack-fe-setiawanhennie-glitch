interface Session {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}

export const auth = {
  api: {
    getSession: async (headers?: { headers: Headers }) => {
      return null as Session | null;
    },
  },
};