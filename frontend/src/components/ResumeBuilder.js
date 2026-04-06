import React, { useState } from 'react';
import { FaDownload, FaPrint, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ResumeBuilder({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experience: [],
    education: [],
    skills: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newExp, setNewExp] = useState({ title: '', company: '', year: '', description: '' });
  const [newEdu, setNewEdu] = useState({ degree: '', institution: '', year: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    const skills = [...formData.skills];
    skills.splice(index, 1);
    setFormData({ ...formData, skills });
  };

  const addExperience = () => {
    if (newExp.title && newExp.company) {
      setFormData({ ...formData, experience: [...formData.experience, newExp] });
      setNewExp({ title: '', company: '', year: '', description: '' });
    }
  };

  const addEducation = () => {
    if (newEdu.degree && newEdu.institution) {
      setFormData({ ...formData, education: [...formData.education, newEdu] });
      setNewEdu({ degree: '', institution: '', year: '' });
    }
  };

  const downloadResume = () => {
    // Save to localStorage
    localStorage.setItem('userResume', JSON.stringify(formData));
    toast.success('Resume saved successfully!');
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Resume Builder</h2>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>

        <div style={styles.content}>
          {/* Personal Info */}
          <div style={styles.section}>
            <h3>Personal Information</h3>
            <div style={styles.formGrid}>
              <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} style={styles.input} />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
              <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} style={styles.input} />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} style={styles.input} />
            </div>
            <textarea name="summary" placeholder="Professional Summary" rows="3" onChange={handleChange} style={styles.textarea} />
          </div>

          {/* Skills */}
          <div style={styles.section}>
            <h3>Skills</h3>
            <div style={styles.addSection}>
              <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill" style={styles.inputSmall} />
              <button onClick={addSkill} style={styles.addBtn}>+ Add</button>
            </div>
            <div style={styles.skillsList}>
              {formData.skills.map((skill, i) => (
                <span key={i} style={styles.skillTag}>
                  {skill} <button onClick={() => removeSkill(i)} style={styles.removeBtn}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={styles.section}>
            <h3>Work Experience</h3>
            <div style={styles.addSection}>
              <input type="text" placeholder="Job Title" value={newExp.title} onChange={(e) => setNewExp({...newExp, title: e.target.value})} style={styles.inputSmall} />
              <input type="text" placeholder="Company" value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} style={styles.inputSmall} />
              <input type="text" placeholder="Year" value={newExp.year} onChange={(e) => setNewExp({...newExp, year: e.target.value})} style={styles.inputSmall} />
              <button onClick={addExperience} style={styles.addBtn}>+ Add</button>
            </div>
            {formData.experience.map((exp, i) => (
              <div key={i} style={styles.itemCard}>
                <strong>{exp.title}</strong> at {exp.company} ({exp.year})
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={styles.section}>
            <h3>Education</h3>
            <div style={styles.addSection}>
              <input type="text" placeholder="Degree" value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} style={styles.inputSmall} />
              <input type="text" placeholder="Institution" value={newEdu.institution} onChange={(e) => setNewEdu({...newEdu, institution: e.target.value})} style={styles.inputSmall} />
              <input type="text" placeholder="Year" value={newEdu.year} onChange={(e) => setNewEdu({...newEdu, year: e.target.value})} style={styles.inputSmall} />
              <button onClick={addEducation} style={styles.addBtn}>+ Add</button>
            </div>
            {formData.education.map((edu, i) => (
              <div key={i} style={styles.itemCard}>
                {edu.degree} from {edu.institution} ({edu.year})
              </div>
            ))}
          </div>

          <div style={styles.actions}>
            <button onClick={downloadResume} style={styles.saveBtn}><FaSave /> Save Resume</button>
            <button onClick={() => window.print()} style={styles.printBtn}><FaPrint /> Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer'
  },
  content: {
    padding: '20px',
    overflowY: 'auto'
  },
  section: {
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '1px solid #e0e0e0'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '15px'
  },
  input: {
    padding: '10px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px'
  },
  inputSmall: {
    padding: '8px 12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    flex: 1
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical'
  },
  addSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  },
  addBtn: {
    padding: '8px 15px',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  skillTag: {
    padding: '5px 10px',
    background: '#667eea',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px'
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  itemCard: {
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  saveBtn: {
    padding: '12px 25px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  printBtn: {
    padding: '12px 25px',
    background: '#34495e',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }
};

export default ResumeBuilder;