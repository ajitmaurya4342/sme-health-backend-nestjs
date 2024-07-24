import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   
    await knex.schema.createTable("ms_company", (table) => {
        table.increments("company_id").primary();
        table.string("company_name");
        table.string("company_uen");
        table.index("company_id");
    });

    await knex.schema.createTable("ms_company_details", (table) => {
        table.increments("mcd_id");
        table.integer("company_id").unsigned()
        table.string("full_name");
        table.string("position_company");
        table.string("email");
        table.string("country_code");
        table.bigInteger("phone_number");
        table.index("company_id");
        table.foreign('company_id').references('ms_company.company_id');
    });

    await knex.schema.createTable("ms_company_file_url", (table) => {
        table.increments("mcfu_id");
        table.integer("company_id").unsigned()
        table.text("file_url");
        table.index("company_id");
        table.foreign('company_id').references('ms_company.company_id');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(
        "ms_company_details"
    );

    await knex.schema.dropTableIfExists(
        "ms_company_file_url"
    )

    await knex.schema.dropTableIfExists(
        "ms_company"
    )
}

