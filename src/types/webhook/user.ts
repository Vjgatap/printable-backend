

export type UserPayloadType=UserDeletedEvent|UserCreatedEvent

export type UserDeletedEvent = {
    data: {
      deleted: boolean;
      id: string;
      object: string;
    };
    event_attributes: {
      http_request: {
        client_ip: string;
        user_agent: string;
      };
    };
    object: string;
    timestamp: number;
    type: "user.deleted";
  };
  
export type UserCreatedEvent = {
    data: {
      birthday: string;
      created_at: number;
      email_addresses: {
        email_address: string;
        id: string;
        linked_to: any[];
        object: "email_address";
        verification: {
          status: "verified" | "unverified";
          strategy: string;
        };
      }[];
      external_accounts: any[];
      external_id: string;
      first_name: string;
      gender: string;
      id: string;
      image_url: string;
      last_name: string;
      last_sign_in_at: number;
      object: "user";
      password_enabled: boolean;
      phone_numbers: any[];
      primary_email_address_id: string;
      primary_phone_number_id: string | null;
      primary_web3_wallet_id: string | null;
      private_metadata: Record<string, any>;
      profile_image_url: string;
      public_metadata: Record<string, any>;
      two_factor_enabled: boolean;
      unsafe_metadata: Record<string, any>;
      updated_at: number;
      username: string | null;
      web3_wallets: any[];
    };
    event_attributes: {
      http_request: {
        client_ip: string;
        user_agent: string;
      };
    };
    object: "event";
    timestamp: number;
    type:"user.created";
  };
  
