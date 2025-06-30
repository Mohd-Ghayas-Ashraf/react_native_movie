// OrgTreeScreen.tsx
import FullTree from '@/components/FullTree';
import TreeNode from '@/components/TreeNode';
import { Org, OrgApiResponse } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text } from 'react-native';

const OM: React.FC = () => {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null); // ✅ track selected

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/org-api')
      .then(res => res.json())
      .then((data: OrgApiResponse) => {
        setOrgs(data.orgs || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('API error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (!orgs.length) return <Text style={{ marginTop: 40 }}>No organizations found</Text>;

  const selectedOrg = orgs.find((o) => o.id === selectedOrgId); // ✅ get selected org object

  return (
    <SafeAreaView style={{ flex: 1 }}>
  <ScrollView contentContainerStyle={{ padding: 16 }}>
    {orgs.map((org) => (
      <TreeNode
        key={org.id}
        org={org}
        level={0}
        onSelect={setSelectedOrgId}
      />
    ))}

    {selectedOrg && (
      <FullTree key={selectedOrg.id} org={selectedOrg} />
    )}
  </ScrollView>
</SafeAreaView>

  );
};

export default OM;
