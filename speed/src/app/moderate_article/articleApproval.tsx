import { useState } from 'react';
import axios from 'axios';
import '../../css/Articles.css';

interface ArticleApprovalProps {
  articleId: string;
  currentStatus: string;
  onUpdate: () => void;  // Function to refresh articles on update
}

const ArticleApproval = ({ articleId, currentStatus, onUpdate }: ArticleApprovalProps) => {
  const [action, setAction] = useState<string>(currentStatus);

  // Handle selection change in dropdown
  const handleActionChange = (value: string) => {
    setAction(value);
  };

  // Handle saving the action (approve or reject)
  const handleSave = async () => {
    try {
      if (action === 'approve') {
        const articlesApproveUrl = `${process.env.NEST_PUBLIC_API_URL}articles/${articleId}/approve`;
        await axios.patch(articlesApproveUrl);
      } else if (action === 'reject') {
        const articlesRejectUrl = `${process.env.NEST_PUBLIC_API_URL}articles/${articleId}/reject`;
        await axios.patch(articlesRejectUrl);
      }
      onUpdate();  // Refresh articles after approval or rejection
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="article-actions">
      <select
        value={action}
        onChange={(e) => handleActionChange(e.target.value)}
        className="action-select"
      >
        <option value="">Select an action</option>
        <option value="approve">Approve</option>
        <option value="reject">Reject</option>
      </select>
      <button
        onClick={handleSave}
        disabled={!action}  // Disable button if no action is selected
        className="submit-btn"
      >
        Save
      </button>
    </div>
  );
};

export default ArticleApproval;
