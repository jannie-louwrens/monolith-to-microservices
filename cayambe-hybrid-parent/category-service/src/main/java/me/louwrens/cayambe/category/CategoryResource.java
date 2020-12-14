package me.louwrens.cayambe.category;

import me.louwrens.cayambe.category.model.Category;

import javax.annotation.security.RolesAllowed;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @GET
    @Path("/categories")
    public List<Category> getCategories() {
        return Category.listAll();
    }

    @GET
    @Path("/categories/{id}")
    public Category getCategory(@PathParam("id") Integer id) {
        Category entity = Category.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Category with id of " + id + " does not exist.", 404);
        }
        return entity;
    }

    @GET
    @Path("/categories/tree")
    public List<Category> getCategoryTree() {
        // Always start from the parent category at the top with id 1.
        Category entity = Category.findById(1);
        if (entity == null) {
            throw new WebApplicationException("Category with id of 1 does not exist.", 404);
        }
        return Stream.of(entity)
                .collect(Collectors.toList());
    }

    @POST
    @Path("/categories")
    @RolesAllowed("admin")
    @Transactional
    public Response create(Category category) {
        if (category.id != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        category.persist();
        return Response.ok(category).status(201).build();
    }

    @PUT
    @Path("/categories/{id}")
    @RolesAllowed("admin")
    @Transactional
    public Category update(@PathParam("id") Integer id, Category category) {
        if (category.name == null) {
            throw new WebApplicationException("Category Name was not set on request.", 422);
        }

        Category entity = Category.findById(id);

        if (entity == null) {
            throw new WebApplicationException("Category with id of " + id + " does not exist.", 404);
        }

        entity.name = category.name;
        entity.parent = category.parent;
        entity.updated = category.updated;

        return entity;
    }

    @DELETE
    @Path("/categories/{id}")
    @RolesAllowed("admin")
    @Transactional
    public Response delete(@PathParam("id") Integer id) {
        Category entity = Category.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Category with id of " + id + " does not exist.", 404);
        }
        entity.visible = false;
        return Response.status(204).build();
    }

}