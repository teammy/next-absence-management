import { prisma } from '~/server/db';
import { faker } from '@faker-js/faker';
import { type LeaveStatus, type Prisma } from '@prisma/client';
import { slugify } from '~/features/shared/helpers/slugify';

async function main() {
  // Create Admin
  const admin = await prisma.personal.upsert({
    where: { person_email: 'admin@babelcoder.com' },
    update: {},
    create: {
      person_email: 'admin@babelcoder.com',
      person_firstname: 'admin',
      person_lastname: 'AdminTeammy',
      role_user: 'ADMIN',
      person_password: 'admin',
      person_password_hash: 'admin',
      person_username: 'admin',
      person_id: faker.string.uuid(),
      person_tel: faker.phone.number(),
      person_photo: faker.internet.avatar(),
      officeSit: {
        connect: {
          ward_id: faker.number.int({min:1, max:2}),
        }, 
      },
    },
  });

  // Create Users
  const numOfUsers = 100;
  const userIds: number[] = [admin.user_id];

  for (let i = 0; i < numOfUsers; i++) {
    const createUserInput: Prisma.personalCreateInput = {
      person_id: faker.string.numeric(13),
      person_firstname: faker.internet.displayName(),
      person_lastname: faker.internet.displayName(),
      person_password: faker.internet.password(),
      person_password_hash: faker.internet.password(),
      person_email: faker.internet.email(),
      person_photo: faker.internet.avatar(),
      person_username: faker.internet.userName(),
      person_tel: faker.phone.number(),
      officeSit: {
        connect: {
          ward_id: faker.number.int({min:1, max:2}),
        },
      },
      role_user: faker.helpers.arrayElement(['MEMBER', 'HR', 'DEPARTMENT_HEAD','MANAGER']),
    };
    const user = await prisma.personal.upsert({
      // where: { person_email: createUserInput.person_email },
      where: { 
        person_id: createUserInput.person_id
      },
      update: {},
      create: createUserInput,
    });

    userIds.push(user.user_id);
  }

  // // Create Leaves
  // const numOfLeaves = 100;

  // for (let i = 0; i < numOfLeaves; i++) {
  //   const status: LeaveStatus = faker.helpers.arrayElement([
  //     'PENDING',
  //     'APPROVED',
  //     'REJECTED',
  //   ]);
  //   const userId = faker.helpers.arrayElement(userIds);
  //   const startLeaveDate = faker.date.future().toISOString();
  //   const endLeaveDate = faker.date.future().toISOString();
  //   const createLeaveInput: Prisma.LeaveCreateInput = {
  //     startLeaveDate: startLeaveDate,
  //     endLeaveDate: endLeaveDate,
  //     totalLeaveDays: faker.datatype.text() ,
  //     typeLeave: faker.helpers.arrayElement(['ANNUAL', 'SICK']),
  //     reason: faker.lorem.paragraph(),
  //     status,
  //     user: { connect: { id: userId } },
  //     rejectionReason:
  //       status === 'REJECTED' ? faker.lorem.paragraph() : undefined,
  //   };

  //   await prisma.leave.upsert({
  //     where: {
  //       userId_startLeaveDate: {
  //         userId,
  //         endLeaveDate
  //       },
  //     },
  //     update: {},
  //     create: createLeaveInput,
  //   });
  // }

  // Create Announcements
  // const numOfAnnouncements = 100;

  // for (let i = 0; i < numOfAnnouncements; i++) {
  //   const title = faker.lorem.sentence();
  //   const createAnnouncementInput: Prisma.AnnouncementCreateInput = {
  //     title,
  //     slug: slugify(title),
  //     excerpt: faker.lorem.paragraph(),
  //     content: faker.lorem.paragraphs({ min: 3, max: 10 }),
  //     user: { connect: { id: faker.helpers.arrayElement(userIds) } },
  //   };

  //   await prisma.announcement.upsert({
  //     where: {
  //       slug: createAnnouncementInput.slug,
  //     },
  //     update: {},
  //     create: createAnnouncementInput,
  //   });
  // }

  // Create Articles
  // const numOfArticles = 100;

  // for (let i = 0; i < numOfArticles; i++) {
  //   const title = faker.lorem.sentence();
  //   const createArticleInput: Prisma.ArticleCreateInput = {
  //     title,
  //     slug: slugify(title),
  //     excerpt: faker.lorem.paragraph(),
  //     content: faker.lorem.paragraphs({ min: 3, max: 10 }),
  //     image: faker.image.url(),
  //     user: { connect: { id: faker.helpers.arrayElement(userIds) } },
  //   };

  //   await prisma.article.upsert({
  //     where: {
  //       slug: createArticleInput.slug,
  //     },
  //     update: {},
  //     create: createArticleInput,
  //   });
  // }

  // create HolidayType 
//   const numOfHolidayType = 20;

//   for (let i = 0; i < numOfHolidayType; i++) {
//     const createHolidayTypeInput: Prisma.HolidayDateCreateInput = {
//       holidayDate: faker.date.future().toISOString(),
//       holidayName: faker.lorem.sentence({ min: 3, max: 5 }),
//       holidayType: {
//         create: {
//           holidayType: faker.string.alphanumeric(2)
//         },
//       },
//     };

//     await prisma.holidayDate.upsert({
//       where: {},
//       update: {},
//       create: createHolidayTypeInput,
//     });
//   }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
