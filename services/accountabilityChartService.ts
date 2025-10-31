import { supabase } from '../lib/supabase';

export type AccountabilityNode = {
  id: string;
  user_id: string;
  title: string | null;
  names: string | null;
  description: string | null;
  x_position: number;
  y_position: number;
  created_at: string;
  updated_at: string;
};

export type AccountabilityLine = {
  id: string;
  user_id: string;
  start_x: number;
  start_y: number;
  end_x: number;
  end_y: number;
  start_node_id: string | null;
  end_node_id: string | null;
  created_at: string;
  updated_at: string;
};

export const accountabilityChartService = {
  // Node operations
  async getNodes(userId: string): Promise<AccountabilityNode[]> {
    const { data, error } = await supabase
      .from('accountability_nodes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createNode(
    userId: string,
    x: number,
    y: number
  ): Promise<AccountabilityNode> {
    const { data, error } = await supabase
      .from('accountability_nodes')
      .insert({
        user_id: userId,
        x_position: x,
        y_position: y,
        title: '',
        names: '',
        description: '',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateNode(
    id: string,
    updates: Partial<Omit<AccountabilityNode, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
  ): Promise<AccountabilityNode> {
    const { data, error } = await supabase
      .from('accountability_nodes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteNode(id: string): Promise<void> {
    const { error } = await supabase
      .from('accountability_nodes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Line operations
  async getLines(userId: string): Promise<AccountabilityLine[]> {
    const { data, error } = await supabase
      .from('accountability_lines')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createLine(
    userId: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): Promise<AccountabilityLine> {
    const { data, error } = await supabase
      .from('accountability_lines')
      .insert({
        user_id: userId,
        start_x: startX,
        start_y: startY,
        end_x: endX,
        end_y: endY,
        start_node_id: null,
        end_node_id: null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateLine(
    id: string,
    updates: Partial<Omit<AccountabilityLine, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
  ): Promise<AccountabilityLine> {
    const { data, error } = await supabase
      .from('accountability_lines')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteLine(id: string): Promise<void> {
    const { error } = await supabase
      .from('accountability_lines')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
