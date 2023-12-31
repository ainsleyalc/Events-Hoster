"""empty message

Revision ID: d76cc0a4c7c9
Revises: 462deef61a99
Create Date: 2023-08-15 14:42:55.937794

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd76cc0a4c7c9'
down_revision = '462deef61a99'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('event_activity_association',
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('activity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['activity_id'], ['activitys.id'], name=op.f('fk_event_activity_association_activity_id_activitys')),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_event_activity_association_event_id_events'))
    )
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.drop_constraint('fk_events_users_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_events_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.drop_column('users_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('users_id', sa.INTEGER(), nullable=False))
        batch_op.drop_constraint(batch_op.f('fk_events_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('fk_events_users_id_users', 'users', ['users_id'], ['id'])
        batch_op.drop_column('user_id')

    op.drop_table('event_activity_association')
    # ### end Alembic commands ###
