import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Patch,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'getAll Movie';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This return movie_id : ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie id ${movieId}`;
  }

  @Put('/:id')
  update(@Param('id') movieId: string) {
    return `This will update a movie id ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will patch a movie id ${movieId}`;
  }
}
