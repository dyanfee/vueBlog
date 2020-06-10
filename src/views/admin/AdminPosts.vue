<template>
  <div class="admin-posts shadow-box main-bgc">
    <el-table
      class="admin-table"
      :data="filterData"
      style="width: 100%"
      v-loading="loading"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" align="center" prop="date" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date|dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center">
        <template slot-scope="scope">
          <!-- <el-tag v-show="!scope.row.tags.length" size="mini">无</el-tag> -->
          <el-tag size="mini" v-for="(tag,index) in scope.row.tags" :key="index">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right" fixed="right" width="150">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      background
      layout="prev, pager, next"
      :total="total"
      hide-on-single-page
      :page-size="limit"
      class="pagination-posts"
    ></el-pagination>
  </div>
</template>

<script>
import { fetchPostMixin } from "common/mixin";
import { formatDate } from "common/utils";
import { removePost } from "network/admin";
export default {
  mixins: [fetchPostMixin],
  data() {
    return {
      search: ""
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    handleEdit(index, data) {
      this.$router.replace({
        name: "文章编辑",
        params: data
      });
    },
    handleDelete(index, data) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._removePost(data);
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _removePost(data) {
      this.loading = true;
      removePost(data).then((res, err) => {
        this.posts = [];
        if (this.list.length - 1 == 0 && this.currentPage != 1) {
          this.currentPage--;
        }
        this.getPosts(this.currentPage);
        if (res.code == 200)
          this.$message({
            type: "success",
            message: "删除成功!"
          });
      });
    }
  },
  computed: {
    tabHeight() {
      return document.body.clientHeight;
    },
    filterData() {
      return this.list.filter(
        data =>
          !this.search ||
          data.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  filters: {
    dateFilter(val) {
      if (!val) return null;
      let res = new Date(val);
      return formatDate(res, "yyyy/MM/dd");
    }
  }
};
</script>

<style>
.admin-posts {
  margin-top: 20px;
  height: 100%;
}
.pagination-posts {
  margin-top: 50px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>