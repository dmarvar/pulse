import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Helper function to get first value from array or return string as-is
const getFirstValue = (value: string[] | string | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }
  return value || "";
};

// Helper function to get numeric value
const getNumericValue = (value: string[] | string | undefined): number | null => {
  const val = getFirstValue(value);
  if (val) {
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
  }
  return null;
};

async function main() {
  console.log('Starting database seeding...')

  // Read the JSON data
  const jsonPath = path.join(process.cwd(), 'public', 'pulseos.json')
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  for (const item of jsonData) {
    try {
      // Create application
      const ownerEmail = item.Owner && Array.isArray(item.Owner) && item.Owner.length > 0 ? item.Owner[0] : undefined;
      const ownerName = ownerEmail ? ownerEmail.split('@')[0] : undefined;
      const integrationOwnerName = item["Intergration Owner"] && Array.isArray(item["Intergration Owner"]) && item["Intergration Owner"].length > 0 ? item["Intergration Owner"][0] : undefined;
      
      const application = await prisma.application.create({
        data: {
          name: item.Applicacion || 'Unknown Application',
          businessUnit: item.BU || 'Unknown BU',
          description: `Application in ${item.BU} business unit`,
          ownerName: ownerName,
          ownerEmail: ownerEmail,
          integrationOwnerName: integrationOwnerName
        }
      })

      console.log(`Created application: ${application.name}`)

      // Create use cases
      if (item["Name of Client (Solution)"] && Array.isArray(item["Name of Client (Solution)"])) {
        for (const useCase of item["Name of Client (Solution)"]) {
          if (useCase.trim()) {
            await prisma.useCase.create({
              data: {
                name: useCase,
                description: `Use case for ${application.name}`,
                applicationId: application.id
              }
            })
          }
        }
      }





      // Create application score
      await prisma.applicationScore.create({
        data: {
          applicationId: application.id,
          implementationLevel: getFirstValue(item["Agent Implementation Level"]) || 'Basic',
          classification: getFirstValue(item["Pulse OS INT Team client classification criteria"]),
          apiAvailability: getFirstValue(item["Unnamed: 7"]),
          teamInvolvement: getFirstValue(item["Unnamed: 9"]),
          readinessStatus: getFirstValue(item["Unnamed: 13"]) || 'Low readiness',
          technicalScore: getNumericValue(item["Unnamed: 6"]),
          businessScore: getNumericValue(item["Unnamed: 8"]),
          resourceScore: getNumericValue(item["Unnamed: 10"]),
          totalScore: getNumericValue(item["Unnamed: 11"]),
          grade: getFirstValue(item["Unnamed: 12"]) || 'Grade 3'
        }
      })

      // Create initial activity
      await prisma.activity.create({
        data: {
          applicationId: application.id,
          title: 'Application Imported',
          description: `Application "${application.name}" was imported from legacy data`,
          type: 'IMPORTED',
          executionDate: new Date().toISOString()
        }
      })

    } catch (error) {
      console.error(`Error processing item ${item.Applicacion}:`, error)
    }
  }

  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 