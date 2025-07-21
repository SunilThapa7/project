// Dummy posts data for the social media feed
export const posts = [
  {
    id: 1,
    userId: 1,
    username: "Kp OLi",
    userAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    image: "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    caption: "Great harvest this season! Rice production increased by 30% using the new irrigation techniques. #RiceHarvest #ModernFarming #Nepal",
    likes: 45,
    comments: 12,
    shares: 8,
    timestamp: "2025-01-20T10:30:00Z",
    location: "Chitwan, Nepal",
    verified: true
  },
  {
    id: 2,
    userId: 2,
    username: "sita_organic",
    userAvatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    caption: "Organic tomatoes are ready for harvest! No pesticides, just natural farming methods. Who wants to buy fresh tomatoes? #OrganicFarming #Tomatoes #HealthyFood",
    likes: 67,
    comments: 23,
    shares: 15,
    timestamp: "2025-01-20T08:15:00Z",
    location: "Pokhara, Nepal",
    verified: true
  },
  {
    id: 3,
    userId: 3,
    username: "Thapa Agri",
    userAvatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    image: "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    caption: "New drone technology helping us monitor crop health. Technology is changing farming! Thanks to AgriConnect for the training. #AgriTech #Drones #SmartFarming",
    likes: 89,
    comments: 34,
    shares: 28,
    timestamp: "2025-01-19T16:45:00Z",
    location: "Kathmandu, Nepal",
    verified: true
  },
  {
    id: 4,
    userId: 4,
    username: "maya_vegetables",
    userAvatar: "https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    image: "https://images.pexels.com/photos/1459459/pexels-photo-1459459.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    caption: "Morning routine: watering my vegetable garden. Fresh cucumbers, beans, and spinach growing well! #VegetableGarden #MorningRoutine #FreshVeggies",
    likes: 34,
    comments: 8,
    shares: 5,
    timestamp: "2025-01-19T06:30:00Z",
    location: "Lalitpur, Nepal",
    verified: false
  },
  {
    id: 5,
    userId: 5,
    username: "gopal_livestock",
    userAvatar: "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    image: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    caption: "Happy cows, quality milk! Our dairy farm is expanding. Looking for buyers for fresh organic milk. #DairyFarming #OrganicMilk #Livestock",
    likes: 56,
    comments: 19,
    shares: 12,
    timestamp: "2025-01-18T14:20:00Z",
    location: "Bhaktapur, Nepal",
    verified: true
  }
];

export const commentsData = {
  1: [
    {
      id: 1,
      userId: 2,
      username: "sita_organic",
      userAvatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      comment: "Congratulations! Which irrigation method did you use?",
      timestamp: "2025-01-20T11:00:00Z"
    },
    {
      id: 2,
      userId: 3,
      username: "krishna_tech",
      userAvatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      comment: "Amazing results! Can you share more details about the technique?",
      timestamp: "2025-01-20T11:15:00Z"
    }
  ],
  2: [
    {
      id: 3,
      userId: 1,
      username: "ramesh_farmer",
      userAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      comment: "Looks great! I'm interested in buying some tomatoes.",
      timestamp: "2025-01-20T09:00:00Z"
    }
  ],
  3: [
    {
      id: 4,
      userId: 4,
      username: "maya_vegetables",
      userAvatar: "https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      comment: "This is the future of farming! Where can I learn about drones?",
      timestamp: "2025-01-19T17:00:00Z"
    }
  ]
};

// Export comments as default for easier importing
export { commentsData as comments };