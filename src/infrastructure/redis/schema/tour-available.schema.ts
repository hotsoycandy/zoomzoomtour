import { Schema } from 'redis-om'

export const tourAvailableSchema = new Schema(
  'tourAvailable',
  { dates: { type: 'number[]' } },
  { dataStructure: 'JSON' },
)
