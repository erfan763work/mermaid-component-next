import { useQuery } from '@tanstack/react-query';
import {
  fetchAllDiagrams,
  fetchFlowcharts,
  fetchSequenceDiagrams,
  fetchClassDiagrams,
  fetchGanttCharts,
  fetchPieCharts,
  fetchEntityRelationshipDiagrams,
  fetchStateDiagrams,
  fetchMindmaps,
  fetchGitGraphs,
  fetchTimelines,
} from './mock';

export const useAllDiagrams = () => {
  return useQuery({
    queryKey: ['mermaid', 'all'],
    queryFn: fetchAllDiagrams,
  });
};

export const useFlowcharts = () => {
  return useQuery({
    queryKey: ['mermaid', 'flowcharts'],
    queryFn: fetchFlowcharts,
  });
};

export const useSequenceDiagrams = () => {
  return useQuery({
    queryKey: ['mermaid', 'sequence'],
    queryFn: fetchSequenceDiagrams,
  });
};

export const useClassDiagrams = () => {
  return useQuery({
    queryKey: ['mermaid', 'class'],
    queryFn: fetchClassDiagrams,
  });
};

export const useGanttCharts = () => {
  return useQuery({
    queryKey: ['mermaid', 'gantt'],
    queryFn: fetchGanttCharts,
  });
};

export const usePieCharts = () => {
  return useQuery({
    queryKey: ['mermaid', 'pie'],
    queryFn: fetchPieCharts,
  });
};

export const useEntityRelationshipDiagrams = () => {
  return useQuery({
    queryKey: ['mermaid', 'er'],
    queryFn: fetchEntityRelationshipDiagrams,
  });
};

export const useStateDiagrams = () => {
  return useQuery({
    queryKey: ['mermaid', 'state'],
    queryFn: fetchStateDiagrams,
  });
};

export const useMindmaps = () => {
  return useQuery({
    queryKey: ['mermaid', 'mindmaps'],
    queryFn: fetchMindmaps,
  });
};

export const useGitGraphs = () => {
  return useQuery({
    queryKey: ['mermaid', 'git'],
    queryFn: fetchGitGraphs,
  });
};

export const useTimelines = () => {
  return useQuery({
    queryKey: ['mermaid', 'timelines'],
    queryFn: fetchTimelines,
  });
};
