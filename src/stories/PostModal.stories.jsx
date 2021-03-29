import * as React from 'react';
import "../styles.css";
import PostModal from '../post-modal/PostModal';

export default {
  title: "PostModal",
  component: PostModal,
};

const PostModalStoryTemplate = (args) => (
  <PostModal {...args} />
);

export const PostModalStory = PostModalStoryTemplate.bind({});
PostModalStory.args = {
  people: [{
    "firstName" : "Arron",
    "lastName" : "Garcia",
    "companyId" : 1,
    "password" : "garciaar",
    "positionTitle" : "CEO",
    "companyName" : "GreenLife Consulting",
    "isManager" : true,
    "employeeId" : 1,
    "email" : "Arron_Garcia@greenlifeconsulting.com",
    "startDate" : "2016-05-04"
  }, {
    "firstName" : "Lacy",
    "lastName" : "Lambert",
    "companyId" : 1,
    "password" : "lambertla",
    "positionTitle" : "Engineering Manager",
    "companyName" : "GreenLife Consulting",
    "isManager" : true,
    "employeeId" : 2,
    "managerId" : 1,
    "email" : "Lacy_Lambert@greenlifeconsulting.com",
    "startDate" : "2010-12-12"
  }, {
    "firstName" : "Diane",
    "lastName" : "Moyer",
    "companyId" : 1,
    "password" : "moyerdi",
    "positionTitle" : "Engineering Manager",
    "companyName" : "GreenLife Consulting",
    "isManager" : true,
    "employeeId" : 3,
    "managerId" : 2,
    "email" : "Diane_Moyer@greenlifeconsulting.com",
    "startDate" : "2011-12-23"
  }]
};


