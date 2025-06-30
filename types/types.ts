export interface Org {
  id: number;
  name: string;
  start_date: string;
  end_date: string | null;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  pivot?: RelationshipPivot;
  related_orgs?: Org[];
  positions?: Position[];
}

export interface Position {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  order: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  pivot?: RelationshipPivot;
  related_employees?: Employee[];
}

export interface Employee {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  pivot?: RelationshipPivot;
}

export interface RelationshipPivot {
  source_type: string;
  source_id: number;
  target_id: number;
  relationship_type: string;
  start_date: string;
  end_date: string;
}

export interface OrgApiResponse {
  orgs: Org[];
}
