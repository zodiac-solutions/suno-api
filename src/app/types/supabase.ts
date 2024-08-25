export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          created_at: string;
          id: number;
          image_index: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_index?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_index?: number | null;
        };
        Relationships: [];
      };
      dietary_links: {
        Row: {
          Email: string | null;
          id: number;
          Link: string | null;
          Name: string | null;
          report_message: string | null;
          status: boolean | null;
        };
        Insert: {
          Email?: string | null;
          id?: number;
          Link?: string | null;
          Name?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Update: {
          Email?: string | null;
          id?: number;
          Link?: string | null;
          Name?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Relationships: [];
      };
      invitations: {
        Row: {
          created_at: string;
          email: string | null;
          email_id: string | null;
          id: number;
          name: string | null;
          org: string | null;
          report_message: string | null;
          status: boolean | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          email_id?: string | null;
          id?: number;
          name?: string | null;
          org?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          email_id?: string | null;
          id?: number;
          name?: string | null;
          org?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Relationships: [];
      };
      invitations_1_nongov: {
        Row: {
          created_at: string;
          email: string | null;
          email_id: string | null;
          id: number;
          link: string | null;
          name: string | null;
          report_message: string | null;
          status: boolean | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          email_id?: string | null;
          id?: number;
          link?: string | null;
          name?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          email_id?: string | null;
          id?: number;
          link?: string | null;
          name?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Relationships: [];
      };
      invitations_2: {
        Row: {
          email: string | null;
          email_id: string | null;
          id: number;
          link: string | null;
          name: string | null;
          org: string | null;
          report_message: string | null;
          status: boolean | null;
        };
        Insert: {
          email?: string | null;
          email_id?: string | null;
          id?: number;
          link?: string | null;
          name?: string | null;
          org?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Update: {
          email?: string | null;
          email_id?: string | null;
          id?: number;
          link?: string | null;
          name?: string | null;
          org?: string | null;
          report_message?: string | null;
          status?: boolean | null;
        };
        Relationships: [];
      };
      suno: {
        Row: {
          created_at: string;
          email: string;
          genre: string;
          id: number;
          name: string;
          prompt: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          genre: string;
          id?: number;
          name: string;
          prompt: string;
          title: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          genre?: string;
          id?: number;
          name?: string;
          prompt?: string;
          title?: string;
        };
        Relationships: [];
      };
      user: {
        Row: {
          created_at: string;
          id: string;
          message: string;
          name: string;
          photo: string;
          pledge: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message: string;
          name: string;
          photo: string;
          pledge: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string;
          name?: string;
          photo?: string;
          pledge?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
