import React, { createContext, ReactNode, useState } from 'react';


type SlideObject = {
    title: string,
    content: string,
    latex_codes: string,
    concepts: string[]
};

type SlideResponse = {
    slides: SlideObject[],
    current_obj_idx: number,
    num_slides: number,
    conversational_response: string
}

// contexts props is the variables or data shared to all children
export interface TutorContextProps {
    sessionKey: string;
    updateSessionKey: (newSessionKey: string) => void;

    currentState: number;
    updateCurrentState: (newSessionKey: number) => void;

    conceptList: string[];
    updateConceptList: (newSessionKey: string[]) => void;

    promptType: number;
    updatePromptType: (newSessionKey: number) => void;

    slides: SlideResponse;
    updateSlides: (newSlides: SlideResponse) => void;

}

const dummySlides: SlideResponse = {
    "slides": [
        {
            "title": "Understanding the Foundations of Graph Data Structures",
            "content": "Definition of Graphs: A graph is a set comprised of nodes (vertices) linked by edges.\nRelevance to Real-World: Graphs model networks such as social media, transportation systems, and internet connections.\nDirected vs Undirected Edges: Directed edges depict relationships with a direction, like Twitter followers; undirected edges show mutual relationships, like Facebook friendships.\nGraph Theory: A mathematical study of graphs and their properties.\nTime Complexity: How computation time of graph algorithms increases with the size of the graph (e.g., O(V+E) for BFS, where V is vertices and E is edges).\nSpace Complexity: The amount of memory required by graph data structures (e.g., O(V^2) for adjacency matrix).\nGraph Representations:\n    - Adjacency Matrix: A 2D array where a[i][j] indicates edge presence from node i to j.\n    - Adjacency List: An array of lists where the i-th list contains all adjacent nodes to node i.\nGraph Traversal: Methods to visit nodes of a graph (e.g., DFS uses a stack, BFS uses a queue).\nPathfinding Algorithms: Dijkstra's algorithm finds shortest paths from a source to all vertices; A* algorithm optimizes with heuristics.\nNetwork Flows: Ford-Fulkerson and Edmonds-Karp algorithms compute the max flow in a flow network.\nGraph Coloring & Scheduling:\n    - Chromatic Number: The minimum number of colors needed to color a graph so that no two adjacent vertices share the same color.\n    - Greedy Algorithm: Procedure to estimate the chromatic number by coloring vertices iteratively.\nSpecial Graphs and Trees: Spanning trees, minimum spanning trees (e.g., using Prim's and Kruskal's algorithms), and graph invariants like Eulerian circuits.\nGraph Applications: GPS for route optimization, resource allocation in networks, studying protein interactions in biology.\nPractical Implementation Example: Creating an adjacency list in Python -\n    graph = {'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A', 'D'], 'D': ['B', 'C']}",
            "latex_codes": ".",
            "concepts": [
                "Graph Data Structure",
                "edges",
                "graph theory"
            ]
        },
        {
            "title": "Traversal Techniques in Graph Data Structures",

            "content": "Graph Traversal: Visiting every vertex (node) in a graph systematically.\nDepth-First Search (DFS):\n   - Employs a stack (LIFO) approach or recursion.\n   - DFS Example: Recursively explores from the start node down one branch to a leaf before backtracking.\n   - Use case: Maze solving, finding connected components.\nBreadth-First Search (BFS):\n   - Uses a queue (FIFO) to explore nodes level by level.\n   - BFS Example: Explores all direct neighbors of the start node, then moves to their neighbors.\n   - Use case: Shortest path in unweighted graphs, peer-to-peer networks.\nComparing DFS and BFS:\n   - DFS can be more space efficient but may find suboptimal paths.\n   - BFS guarantees the shortest path on unweighted graphs, yet can require more memory.\nGraph Traversal Illustrations:\n   - Visual process diagrams to show steps taken by DFS and BFS.\nTraversal Applications:\n   - Real-world scenarios to demonstrate the practical use of each algorithm.\nConnecting Theoretical Concepts:\n   - Link with prior learning on graph representations, including trees and special graphs.",
            "latex_codes": "",
            "concepts": [
                "Graph Traversal Algorithms",
                "Depth-First Search (DFS)",
                "Breadth-First Search (BFS)",
                "stack",
                "queue",
                "vertices",
                "edges"
            ]
        },
        {
            "title": "Graph Pathfinding Algorithms and Network Flows: Foundations to Applications",
            "content": "Exploration of Graph Pathfinding Algorithms:\n  - Dijkstra's Algorithm: Finds shortest paths from a single source vertex to all other vertices in a graph with non-negative weights\n      Example: Shortest path in a road network without tolls\n  - A* Algorithm: Heuristic-based, optimizes pathfinding with an estimate of the cost to reach the goal\n      Example: GPS navigation by estimating distances to the destination\n  - Bellman-Ford Algorithm: Accommodates graphs with negative weights, manages detection of negative cycles\n      Example: Currency exchange routing where some conversions may lead to losses (negative edges)\nIntroduction to Network Flow:\n  - Definitions: Net capacity, flow network, source & sink nodes\n  - Ford-Fulkerson Method: Computes the maximum flow in a flow network\n      Example: Max water flow through a system of pipes with varying capacities\n  - Edmonds-Karp Algorithm: An implementation of Ford-Fulkerson, using breadth-first search to find augmenting paths\n      Example: Optimizing traffic flow in road networks during peak hours\nContextual Applications:\n  - GPS Navigation Systems\n  - Internet Data Routing\n  - Supply Chain and Logistics Planning\n  - Resource Distribution in Networked Systems\nCore Principles and Their Implications:\n  - Time Complexity: How the running time of algorithms scales with the size of the input\n  - Space Complexity: How the memory usage of algorithms scales with the size of the input\nRelation to Underlying Graph Theory Concepts:\n  - Graph traversal's foundational role in pathfinding and network flows\n  - Impact of algorithm selection on efficiency based on graph's properties\nVisual and Empirical Aids:\n  - Diagrams demonstrating algorithms' processes\n  - Tabular comparatives of algorithm performances on sample graphs\nLinking Theory to Practice:\n  - Step-by-step explanation of algorithms with real-life examples\n  - Discussion of computational considerations and optimization techniques",
            "latex_codes": "",
            "concepts": [
                "Graph Pathfinding Algorithms",
                "Network Flow",
                "Dijkstra's algorithm",
                "A* algorithm",
                "Bellman-Ford algorithm",
                "Ford-Fulkerson algorithm",
                "Edmonds-Karp algorithm",
                "graph theory",
                "time complexity",
                "space complexity"
            ]
        }
    ],
    "current_obj_idx": 0,
    "num_slides": 16,
    "conversational_response": ""
}

// settting default values
const TutorContext = createContext<TutorContextProps>({
    sessionKey: '',
    updateSessionKey: () => { },
    currentState: 0,
    updateCurrentState: () => { },
    conceptList: [],
    updateConceptList: () => { },
    promptType: -2,
    updatePromptType: () => { },
    slides: dummySlides,
    updateSlides: () => { }
});


interface TutorProviderProps {
    children: ReactNode;
}


const TutorProvider: React.FC<TutorProviderProps> = ({ children }) => {
    const [sessionKey, setSessionKey] = useState<string>("")
    const updateSessionKey = (newSessionKey: string) => {
        setSessionKey(newSessionKey);
    };

    const [currentState, setCurrentState] = useState<number>(0)
    const updateCurrentState = (newCurrentState: number) => {
        setCurrentState(newCurrentState);
    };

    const [conceptList, setConceptList] = useState<string[]>([])
    const updateConceptList = (newConceptList: string[]) => {
        setConceptList(newConceptList);
    };

    const [promptType, setPromptType] = useState<number>(-2)
    const updatePromptType = (newPromptType: number) => {
        setPromptType(newPromptType);
    }

    const [slides, setSlides] = useState<SlideResponse>(dummySlides);
    const updateSlides = (newSlides: SlideResponse) => {
        return setSlides(newSlides);
    }

    const contextValue: TutorContextProps = {
        sessionKey,
        updateSessionKey,
        currentState,
        updateCurrentState,
        conceptList,
        updateConceptList,
        promptType,
        updatePromptType,
        slides,
        updateSlides
    };


    return <TutorContext.Provider value={contextValue}>{children}</TutorContext.Provider>;
};

export { TutorProvider, TutorContext };
