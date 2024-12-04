import React from 'react';
import { Users, MessageSquare, GitBranch, History } from 'lucide-react';

export default function ApiCollaborationHub() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Users className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">Collaboration Hub</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <MessageSquare size={16} />
            API Reviews
          </h3>
          <div className="space-y-3">
            {[
              { title: 'New Authentication Flow', author: 'Sarah Chen', status: 'pending' },
              { title: 'Rate Limiting Update', author: 'Mike Johnson', status: 'approved' },
              { title: 'Error Handling Standards', author: 'Alex Kim', status: 'in_review' }
            ].map((review) => (
              <div key={review.title} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{review.title}</p>
                  <p className="text-sm text-gray-500">By {review.author}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  review.status === 'approved' 
                    ? 'bg-green-100 text-green-800'
                    : review.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {review.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <GitBranch size={16} />
            Recent Changes
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Updated', component: 'User Authentication API', author: 'David Lee', time: '2h ago' },
              { action: 'Added', component: 'Payment Webhook', author: 'Emma Wilson', time: '5h ago' },
              { action: 'Deprecated', component: 'Legacy Search API', author: 'Chris Taylor', time: '1d ago' }
            ].map((change) => (
              <div key={change.component} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{change.component}</p>
                  <p className="text-sm text-gray-500">{change.author} • {change.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  change.action === 'Updated'
                    ? 'bg-blue-100 text-blue-800'
                    : change.action === 'Added'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {change.action}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <History size={16} />
            Breaking Changes Timeline
          </h3>
          <div className="space-y-4">
            {[
              { 
                version: 'v2.0.0',
                changes: ['Authentication mechanism update', 'Response format changes'],
                date: '2024-04-01'
              },
              {
                version: 'v1.5.0',
                changes: ['Deprecated legacy endpoints'],
                date: '2024-03-15'
              }
            ].map((timeline) => (
              <div key={timeline.version} className="relative pl-4 border-l-2 border-gray-200">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2" />
                <p className="font-medium">{timeline.version}</p>
                <p className="text-sm text-gray-500 mb-2">{timeline.date}</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {timeline.changes.map((change, index) => (
                    <li key={index} className="text-gray-600">{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Team Activity</h3>
          <div className="space-y-3">
            {[
              { user: 'Sarah Chen', action: 'reviewed', target: 'Authentication API', time: '10m ago' },
              { user: 'Mike Johnson', action: 'updated', target: 'Rate Limiting Policy', time: '1h ago' },
              { user: 'Alex Kim', action: 'created', target: 'New API Version', time: '3h ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {activity.user.charAt(0)}
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="text-blue-600">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}