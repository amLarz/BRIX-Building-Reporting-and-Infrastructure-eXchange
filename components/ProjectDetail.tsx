
import React, { useState, useRef } from 'react';
import { Project, ProjectStatus } from '../types';
import TugOfWar from './TugOfWar';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onVote: (type: 'up' | 'down') => void;
  onUpdateStatus: (status: ProjectStatus) => void;
  onAddComment: (text: string, image?: string) => void;
  onMaterialClick: (materialName: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ 
  project, 
  onBack, 
  onVote, 
  onUpdateStatus, 
  onAddComment,
  onMaterialClick 
}) => {
  const [commentText, setCommentText] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText, previewImage || undefined);
    setCommentText('');
    setPreviewImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleViewDoc = () => {
    alert(`BRIX Verification: Opening document "${project.verificationDoc}" for review. In a live environment, this would open the verified PDF file.`);
  };

  const GLOBAL_DB_URL = "https://share.google/AaBXqWaNwFF6RrT0u";

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 space-y-4">
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-[#8B3A2B] transition-colors">
            ← Back to projects
          </button>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <img src={project.imageUrl} alt={project.name} className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
               <span className="bg-[#8B3A2B] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 inline-block">PHILIPPINES INFRA</span>
               <h2 className="text-3xl font-black leading-tight uppercase tracking-tighter">{project.name}</h2>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Project Overview</h3>
              <p className="text-gray-700 leading-relaxed font-medium">{project.description}</p>
              
              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                 <div>
                    <span className="block text-[10px] font-black text-gray-400 uppercase">Location</span>
                    <span className="font-bold text-gray-900 text-sm">{project.location}</span>
                 </div>
                 <div>
                    <span className="block text-[10px] font-black text-gray-400 uppercase">Status</span>
                    <span className={`font-bold text-sm ${project.status === 'Finished Project' ? 'text-green-600' : 'text-[#8B3A2B]'}`}>{project.status}</span>
                 </div>
                 <div>
                    <span className="block text-[10px] font-black text-gray-400 uppercase">Target Deadline</span>
                    <span className="font-bold text-gray-900 text-sm">{project.deadline}</span>
                 </div>
                 {project.verificationDoc && (
                   <div>
                      <span className="block text-[10px] font-black text-gray-400 uppercase">Verification Doc</span>
                      <button 
                        onClick={handleViewDoc}
                        className="text-xs font-bold text-[#8B3A2B] underline cursor-pointer truncate block text-left w-full hover:text-[#6A2B20]"
                      >
                        {project.verificationDoc}
                      </button>
                   </div>
                 )}
              </div>
           </div>

           {/* Status Update Management Section */}
           <div className="bg-[#EAD8B1]/40 p-6 rounded-3xl border-2 border-gray-900/5 flex flex-col items-center gap-4">
              <h4 className="font-bold text-gray-800 italic text-sm text-center">Would you like to vote this project as "Finished"?</h4>
              <div className="flex gap-4">
                 <button 
                   onClick={() => onUpdateStatus('Finished Project')}
                   className={`w-14 h-14 rounded-full font-black flex items-center justify-center transition-all ${project.status === 'Finished Project' ? 'bg-green-600 text-white shadow-xl scale-110' : 'bg-white border-2 border-gray-200 text-gray-300 hover:border-green-400 hover:text-green-400'}`}
                 >Y</button>
                 <button 
                   onClick={() => onUpdateStatus('Developing Project')}
                   className={`w-14 h-14 rounded-full font-black flex items-center justify-center transition-all ${project.status === 'Developing Project' ? 'bg-red-600 text-white shadow-xl scale-110' : 'bg-white border-2 border-gray-200 text-gray-300 hover:border-red-400 hover:text-red-400'}`}
                 >N</button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 text-center">Community Sentiment</h3>
              <TugOfWar upvotes={project.upvotes} downvotes={project.downvotes} />
              <div className="flex justify-center gap-4 mt-6">
                 <button onClick={() => onVote('down')} className="flex flex-col items-center group">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 font-black text-xl group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">▼</div>
                    <span className="text-[10px] font-black mt-1 text-red-600 uppercase">Concerned</span>
                 </button>
                 <button onClick={() => onVote('up')} className="flex flex-col items-center group">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 font-black text-xl group-hover:bg-green-500 group-hover:text-white transition-all shadow-sm">▲</div>
                    <span className="text-[10px] font-black mt-1 text-green-600 uppercase">Supporter</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Materials Table - Linked to database */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <div className="bg-gray-900 p-6 flex justify-between items-center">
            <h3 className="text-white font-black italic uppercase tracking-widest">Linked Materials Database</h3>
            <div className="w-12 h-6 construction-stripes opacity-30" />
          </div>
          <div className="p-0 overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[400px]">
               <thead>
                 <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Material Item</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Unit</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-right">Est. Price</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {project.materials.map((m, i) => (
                   <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5">
                         <div className="flex flex-col gap-1">
                            <button 
                              onClick={() => onMaterialClick(m.material)}
                              className="text-left font-bold text-gray-900 hover:text-[#8B3A2B] transition-colors focus:outline-none leading-tight"
                            >
                               {m.material}
                            </button>
                            <a 
                              href={GLOBAL_DB_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[8px] font-black uppercase text-gray-400 tracking-widest hover:text-[#8B3A2B] transition-colors w-max"
                            >
                               View Ref Specs ↗
                            </a>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500">{m.unit}</td>
                      <td className="px-6 py-5 text-right font-black text-[#8B3A2B]">{m.price}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
             <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
               <span className="text-[10px] font-bold text-gray-400 italic">
                 * Material prices are synchronized with national standards.
               </span>
               <a href={GLOBAL_DB_URL} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase text-[#8B3A2B] hover:underline">
                 Open National Database →
               </a>
             </div>
          </div>
        </section>

        {/* Discussion Feed */}
        <section className="space-y-6">
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Post an Update</h3>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                 <textarea 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Contribute transparency data or provide site photos..."
                    className="w-full min-h-[100px] bg-[#FDF7E7]/30 border-b-2 border-gray-200 rounded-t-xl p-4 text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#8B3A2B] outline-none transition-all"
                 />
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                       >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                       </button>
                       <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                       {previewImage && (
                          <div className="relative group">
                             <img src={previewImage} className="w-10 h-10 rounded-lg object-cover border-2 border-[#8B3A2B]" />
                             <button onClick={() => setPreviewImage(null)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] transition-transform hover:scale-125">×</button>
                          </div>
                       )}
                    </div>
                    <button type="submit" className="bg-[#8B3A2B] text-white px-8 py-2 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#8B3A2B]/30 hover:scale-105 transition-transform active:scale-95">Post Comment</button>
                 </div>
              </form>
           </div>

           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Discussion Feed</h3>
              {project.comments.map(c => (
                <div key={c.id} className="bg-white p-5 rounded-3xl border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                   <img src={c.avatar} className="w-10 h-10 rounded-full flex-shrink-0" alt="" />
                   <div className="space-y-2 flex-grow">
                      <div className="flex justify-between items-start">
                         <div>
                            <span className="font-bold text-gray-900 mr-2 text-sm uppercase tracking-tight">{c.author}</span>
                            <span className="text-[8px] font-black uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-500">{c.role}</span>
                         </div>
                         <span className="text-[10px] text-gray-400 font-mono">{c.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">{c.text}</p>
                      {c.image && (
                        <div className="mt-2 rounded-2xl overflow-hidden border border-gray-100 max-w-[240px] shadow-sm">
                           <img src={c.image} className="w-full h-auto cursor-zoom-in hover:scale-105 transition-transform" alt="Evidence" />
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
