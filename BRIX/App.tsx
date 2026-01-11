
import React, { useState } from 'react';
import { ViewState, Project, ProjectStatus } from './types';
import { INITIAL_PROJECTS, MATERIAL_CATEGORIES } from './data';
import Header from './components/Header';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import MaterialPriceList from './components/MaterialPriceList';
import AddProject from './components/AddProject';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigateHome = () => setView({ type: 'home' });
  const handleViewProject = (id: string) => setView({ type: 'project-detail', projectId: id });
  const handleViewPrices = (id: string) => setView({ type: 'material-prices', categoryId: id });
  const handleAddProjectView = () => setView({ type: 'add-project' });

  const handleMaterialClick = (materialName: string) => {
    // Fuzzy match material name to find the right category
    const category = MATERIAL_CATEGORIES.find(cat => 
      cat.items.some(item => 
        item.name.toLowerCase().includes(materialName.toLowerCase()) ||
        materialName.toLowerCase().includes(item.name.split(',')[0].toLowerCase())
      )
    );
    
    if (category) {
      handleViewPrices(category.id);
    } else {
      // Fallback to the first category if no specific match is found
      handleViewPrices(MATERIAL_CATEGORIES[0].id);
    }
  };

  const handleVote = (projectId: string, type: 'up' | 'down') => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        upvotes: type === 'up' ? p.upvotes + 1 : p.upvotes,
        downvotes: type === 'down' ? p.downvotes + 1 : p.downvotes
      };
    }));
  };

  const handleUpdateProjectStatus = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        status: newStatus,
        finishDate: newStatus === 'Finished Project' ? new Date().toLocaleDateString('en-GB') : undefined
      };
    }));
  };

  const handleAddComment = (projectId: string, text: string, image?: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const newComment = {
        id: Math.random().toString(36).substr(2, 9),
        author: 'Guest User',
        role: 'Community Member',
        text,
        image,
        avatar: `https://i.pravatar.cc/150?u=guest${Math.random()}`,
        date: new Date().toISOString().split('T')[0]
      };
      return {
        ...p,
        comments: [newComment, ...p.comments]
      };
    }));
  };

  const handleCreateProject = (newProject: Omit<Project, 'id' | 'upvotes' | 'downvotes' | 'comments'>) => {
    const project: Project = {
      ...newProject,
      id: newProject.name.toLowerCase().replace(/\s+/g, '-'),
      upvotes: 0,
      downvotes: 0,
      comments: []
    };
    setProjects(prev => [project, ...prev]);
    setView({ type: 'home' });
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderView = () => {
    switch (view.type) {
      case 'home':
        return (
          <Home 
            projects={filteredProjects} 
            categories={MATERIAL_CATEGORIES}
            onProjectClick={handleViewProject}
            onCategoryClick={handleViewPrices}
            onVote={handleVote}
          />
        );
      case 'project-detail':
        const project = projects.find(p => p.id === view.projectId);
        if (!project) return <div>Project not found</div>;
        return (
          <ProjectDetail 
            project={project} 
            onBack={handleNavigateHome} 
            onVote={(type) => handleVote(project.id, type)}
            onUpdateStatus={(status) => handleUpdateProjectStatus(project.id, status)}
            onAddComment={(text, img) => handleAddComment(project.id, text, img)}
            onMaterialClick={handleMaterialClick}
          />
        );
      case 'material-prices':
        const category = MATERIAL_CATEGORIES.find(c => c.id === view.categoryId);
        if (!category) return <div>Category not found</div>;
        return <MaterialPriceList category={category} onBack={handleNavigateHome} />;
      case 'add-project':
        return <AddProject onBack={handleNavigateHome} onSubmit={handleCreateProject} />;
      default:
        return <div>404 - Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-12">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        onHomeClick={handleNavigateHome}
        onAddClick={handleAddProjectView}
      />
      <main className="container mx-auto px-4 mt-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
